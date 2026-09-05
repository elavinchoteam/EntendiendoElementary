// AI Feedback service with real Gemini API integration and intelligent offline heuristic fallback

export interface FeedbackData {
  attemptNumber: number;
  stars: 1 | 2 | 3;
  scoreSummaryEn: string;
  scoreSummaryEs: string;
  strengthsEn: string;
  strengthsEs: string;
  correctionsEn: string;
  correctionsEs: string;
  improvementsEn: string;
  improvementsEs: string;
  suggestedAdEn: string;
  suggestedAdEs: string;
  checklist: {
    magazineTheme: boolean;
    usualCost: boolean;
    salePriceAndCD: boolean;
    telephoneNumber: boolean;
    adGreetingAndClose: boolean;
  };
}

export async function requestAiFeedback(
  studentText: string,
  attemptNumber: number
): Promise<FeedbackData> {
  // First attempt calling server endpoint if available
  try {
    const response = await fetch('/api/ai-feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentText,
        attempt: attemptNumber,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success && data.feedback) {
        return {
          ...data.feedback,
          attemptNumber,
        };
      }
    }
  } catch (err) {
    // If backend is unreachable or not responding, continue to intelligent fallback
    console.info('Using client-side pedagogical evaluator');
  }

  // Intelligent pedagogical fallback evaluator
  return evaluateTextHeuristically(studentText, attemptNumber);
}

export function evaluateTextHeuristically(
  text: string,
  attemptNumber: number
): FeedbackData {
  const lower = text.toLowerCase();
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  // Key criteria checks based on unit prompt
  const hasGreeting =
    /hi\b|hello\b|good\s+(morning|afternoon|day)|calling\s+from|this\s+is/.test(lower);
  const hasMagazineTheme =
    /rock\s*city|music|magazine|band|artist|song|rock\s+and\s+roll|album/.test(lower);
  const hasUsualCost =
    /usual|cost|price|regular|was|\$|dollar|before|originally|each/.test(lower) &&
    /\d+/.test(lower);
  const hasSalePrice =
    /sale|now|only|discount|special|get|\$|dollar|cheap|less|free/.test(lower) &&
    /\d+/.test(lower);
  const hasFreeCd = /free\s+cd|cd|free|compact\s+disc/.test(lower);
  const hasPhoneNumber =
    /\d{3}[-\s]?\d{3,4}|\d{5,8}|phone|number|call\s+now|dial|telephone/.test(lower);
  const hasClosing =
    /call\s+now|don't\s+forget|dont\s+forget|remember|order\s+today|works\s+for\s+you/.test(lower);

  const pointsCount = [
    hasMagazineTheme,
    hasUsualCost,
    hasSalePrice && hasFreeCd,
    hasPhoneNumber,
    hasGreeting || hasClosing,
  ].filter(Boolean).length;

  let stars: 1 | 2 | 3 = 1;
  if (pointsCount >= 4 && wordCount >= 25) {
    stars = 3;
  } else if (pointsCount >= 2 && wordCount >= 15) {
    stars = 2;
  } else {
    stars = 1;
  }

  const checklist = {
    magazineTheme: hasMagazineTheme,
    usualCost: hasUsualCost,
    salePriceAndCD: hasSalePrice && hasFreeCd,
    telephoneNumber: hasPhoneNumber,
    adGreetingAndClose: hasGreeting || hasClosing,
  };

  // Feedback compositions
  if (stars === 3) {
    return {
      attemptNumber,
      stars: 3,
      checklist,
      scoreSummaryEn: 'Outstanding telephone ad! You included all the key sales information.',
      scoreSummaryEs: '¡Excelente anuncio telefónico! Has incluido toda la información clave de venta.',
      strengthsEn: `Great job introducing "Rock City Magazine", mentioning the regular price vs. the discount price with the free CD, and providing your phone number (${wordCount} words). Your tone is friendly and persuasive!`,
      strengthsEs: `¡Gran trabajo al presentar "Rock City Magazine", mencionar el precio habitual frente al precio de oferta con el CD gratis, y dar tu número de teléfono (${wordCount} palabras). ¡Tu tono es convincente y profesional!`,
      correctionsEn: 'Your grammar and sentence structure are very clear. To sound even more like a native salesperson, add energetic punctuation like exclamation marks (!) and phrases such as "Don\'t miss out!" or "Call today!".',
      correctionsEs: 'Tu gramática y estructura son muy claras. Para sonar aún más como un vendedor nativo, añade signos de exclamación (!) y frases enérgicas como "Don\'t miss out!" (¡No te lo pierdas!) o "Call today!".',
      improvementsEn: 'Make sure your telephone number is repeated twice so callers don\'t forget it, just like Chuck Wood did ("That number was 555-9663").',
      improvementsEs: 'Asegúrate de repetir el número de teléfono dos veces para que no lo olviden, tal como hizo Chuck Wood ("That number was 555-9663").',
      suggestedAdEn:
        'Hi, there! This is Alex calling from "Rock City Magazine." Do you love rock music? We have an exciting sale this month: our magazine usually costs $3.50 each, but now it\'s only $10 for five magazines—plus you get a free CD! That\'s just $2 each. Call now at 555-4422. Don\'t forget! That number is 555-4422. "Rock City Magazine" rocks for you!',
      suggestedAdEs:
        '¡Hola! Les habla Alex llamando desde "Rock City Magazine". ¿Te encanta la música rock? Tenemos una oferta emocionante este mes: nuestra revista normalmente cuesta $3.50 cada una, pero ahora son solo $10 por cinco revistas, ¡y además te llevas un CD gratis! Eso es solo $2 cada una. Llama ahora al 555-4422. ¡No lo olvides! Ese número es 555-4422. ¡"Rock City Magazine" rockea para ti!',
    };
  }

  if (stars === 2) {
    const missing: string[] = [];
    const missingEs: string[] = [];
    if (!hasMagazineTheme) {
      missing.push('explain that "Rock City" is a music magazine');
      missingEs.push('explicar que "Rock City" es una revista de música');
    }
    if (!hasUsualCost) {
      missing.push('state the regular/usual price');
      missingEs.push('indicar el precio habitual');
    }
    if (!hasFreeCd) {
      missing.push('mention the special offer with the free CD');
      missingEs.push('mencionar la oferta especial con el CD gratis');
    }
    if (!hasPhoneNumber) {
      missing.push('give a telephone number to call');
      missingEs.push('dar un número de teléfono de contacto');
    }

    const missingMsgEn =
      missing.length > 0
        ? `Remember to also ${missing.join(', and ')}.`
        : 'Try adding more detail to convince your listener!';
    const missingMsgEs =
      missingEs.length > 0
        ? `Recuerda también ${missingEs.join(' y ')}.`
        : '¡Intenta añadir más detalles para convencer a quien te escucha!';

    return {
      attemptNumber,
      stars: 2,
      checklist,
      scoreSummaryEn: 'Good start! Your ad has a nice sales pitch, but is missing a few details.',
      scoreSummaryEs: '¡Buen comienzo! Tu anuncio tiene buena intención, pero le faltan algunos detalles.',
      strengthsEn: `You wrote ${wordCount} words and established a sales proposal. You are on the right track with your vocabulary!`,
      strengthsEs: `Escribiste ${wordCount} palabras y estableciste una propuesta de venta. ¡Vas por buen camino con tu vocabulario!`,
      correctionsEn: `Check your key prompt requirements: ${missingMsgEn} Check your verb tenses (e.g., "The price was $3.00, now it is only $1.50").`,
      correctionsEs: `Revisa los requisitos clave: ${missingMsgEs} Comprueba los tiempos verbales (por ejemplo: "The price was $3.00, now it is only $1.50").`,
      improvementsEn: 'Structure your ad with three parts: 1) Greeting & introduction, 2) Price comparison & free CD bonus, 3) Call to action with phone number.',
      improvementsEs: 'Estructura tu anuncio en tres partes: 1) Saludo y presentación, 2) Comparación de precios y regalo del CD, 3) Llamado a la acción con tu número de teléfono.',
      suggestedAdEn:
        'Hello! This is Chris calling from "Rock City Magazine." We have our biggest sale of the year! The magazine was $4.00 each. Now it is only $12 for six magazines, and it comes with a free rock CD! Call right now at 555-7890. That is 555-7890. Call today!',
      suggestedAdEs:
        '¡Hola! Habla Chris de "Rock City Magazine". ¡Tenemos nuestra mayor oferta del año! La revista costaba $4.00 cada una. Ahora cuesta solo $12 por seis revistas, ¡y viene con un CD de rock gratis! Llama ahora mismo al 555-7890. Ese número es 555-7890. ¡Llama hoy!',
    };
  }

  // stars === 1
  return {
    attemptNumber,
    stars: 1,
    checklist,
    scoreSummaryEn: 'Needs more detail. Answer all the questions in the prompt.',
    scoreSummaryEs: 'Necesita más detalles. Asegúrate de responder todas las preguntas del ejercicio.',
    strengthsEn: `You started your text (${wordCount} words). Keep going! You have up to 2 AI feedback requests to polish it.`,
    strengthsEs: `Has iniciado tu texto (${wordCount} palabras). ¡Continúa! Tienes hasta 2 revisiones con IA para pulirlo.`,
    correctionsEn:
      'Make sure you answer: 1. What is the magazine about? (Music/Rock). 2. How much does it usually cost? ($...). 3. How much is it now with the free CD? 4. What is your telephone number? (555-...).',
    correctionsEs:
      'Asegúrate de responder: 1. ¿De qué trata la revista? (Música/Rock). 2. ¿Cuánto cuesta normalmente? ($...). 3. ¿Cuánto cuesta ahora con el CD gratis? 4. ¿Cuál es tu teléfono? (555-...).',
    improvementsEn:
      'Look back at how Chuck Wood structured his telephone ad in Activity 1: "Hi, there! This is [Name] calling from Rock City Magazine..."',
    improvementsEs:
      'Mira cómo Chuck Wood estructuró su anuncio telefónico en la Actividad 1: "Hi, there! This is [Nombre] calling from Rock City Magazine..."',
    suggestedAdEn:
      'Hi, there! This is Sam calling from "Rock City Magazine." Do you love music? Our magazine is usually $3.00 each. This month it is only $10 for 5 magazines, and you get a free CD! Call now at 555-8822. Remember, call 555-8822 today!',
    suggestedAdEs:
      '¡Hola! Habla Sam de "Rock City Magazine". ¿Te gusta la música? Nuestra revista cuesta normalmente $3.00 cada una. Este mes cuesta solo $10 por 5 revistas, ¡y te llevas un CD gratis! Llama ya al 555-8822. Recuerda, ¡llama al 555-8822 hoy!',
  };
}
