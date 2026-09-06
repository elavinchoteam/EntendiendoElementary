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
  checklist?: Record<string, boolean>;
}

export async function requestAiFeedback(
  studentText: string,
  attemptNumber: number,
  exercisePrompt?: string,
  exerciseId?: string,
  storyContext?: string
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
        prompt: exercisePrompt,
        exerciseId,
        storyContext,
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
  return evaluateTextHeuristically(studentText, attemptNumber, exercisePrompt, exerciseId);
}

export function evaluateTextHeuristically(
  text: string,
  attemptNumber: number,
  exercisePrompt?: string,
  exerciseId?: string
): FeedbackData {
  // Check if this is the "Wrong Color" comprehension writing assignment
  if (
    exerciseId?.includes('wrong-color') ||
    exercisePrompt?.toLowerCase().includes('wrong color') ||
    exercisePrompt?.toLowerCase().includes('chair')
  ) {
    return evaluateWrongColorHeuristically(text, attemptNumber);
  }

  // Default: Phone Sales "Rock City" ad evaluation
  return evaluateRockCityHeuristically(text, attemptNumber);
}

export function evaluateWrongColorHeuristically(
  text: string,
  attemptNumber: number
): FeedbackData {
  const lower = text.toLowerCase();
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  // 1. Why called "Wrong Color"?
  const explainsWrongColor =
    /wrong\s+color|mix(ed)?\s*up|mistake|error|different\s+color|wrong\s+chair|green\s+instead|brown\s+instead/.test(
      lower
    );

  // 2. Who ordered a green chair?
  const mentionsMrBrownGreen =
    /(mr\.?|mister)\s*brown.*green|green.*(mr\.?|mister)\s*brown|brown\s+ordered.*green|green\s+chair.*brown/.test(
      lower
    ) ||
    ((/mr\.?\s*brown\b/.test(lower) || /\bbrown\b/.test(lower)) && /green\b/.test(lower));

  // 3. Who ordered a brown chair?
  const mentionsMsGreenBrown =
    /(ms\.?|mrs\.?|miss)\s*green.*brown|brown.*(ms\.?|mrs\.?|miss)\s*green|green\s+ordered.*brown|brown\s+chair.*green/.test(
      lower
    ) ||
    ((/ms\.?\s*green\b|mrs\.?\s*green\b|miss\s*green\b/.test(lower)) && /brown\b/.test(lower));

  // 4. What happened? (store was closed, met outside, exchanged chairs)
  const explainsWhatHappened =
    /exchange|swap|trade|met\b|meet\b|outside|store.*close|closed.*store|took|brought|delivered|hugged|happy/.test(
      lower
    );

  const pointsCount = [
    explainsWrongColor,
    mentionsMrBrownGreen,
    mentionsMsGreenBrown,
    explainsWhatHappened,
  ].filter(Boolean).length;

  let stars: 1 | 2 | 3 = 1;
  if (pointsCount >= 4 && wordCount >= 20) {
    stars = 3;
  } else if (pointsCount >= 2 && wordCount >= 10) {
    stars = 2;
  } else {
    stars = 1;
  }

  const checklist = {
    explainsWrongColor,
    mentionsMrBrownGreen,
    mentionsMsGreenBrown,
    explainsWhatHappened,
  };

  if (stars === 3) {
    return {
      attemptNumber,
      stars: 3,
      checklist,
      scoreSummaryEn:
        'Outstanding response! You explained the story clearly and answered all the questions.',
      scoreSummaryEs:
        '¡Respuesta sobresaliente! Explicaste la historia con claridad y respondiste todas las preguntas.',
      strengthsEn: `Excellent job explaining why the story is called "Wrong Color", correctly identifying that Mr. Brown ordered the green chair and Ms. Green ordered the brown chair, and describing the mix-up and how they exchanged chairs (${wordCount} words). Your English narrative is clear and well-structured!`,
      strengthsEs: `Excelente trabajo explicando por qué la historia se llama "Color Equivocado", identificando correctamente que el Sr. Brown pidió la silla verde y la Sra. Green la silla marrón, y describiendo la confusión y cómo intercambiaron las sillas (${wordCount} palabras). ¡Tu redacción en inglés es clara y bien estructurada!`,
      correctionsEn:
        'Your grammar and sentence structure are very solid. Check past tense irregular and regular forms (e.g., "ordered", "brought", "found", "met", "exchanged").',
      correctionsEs:
        'Tu gramática y estructura son muy sólidas. Revisa los verbos en pasado (por ejemplo: "ordered", "brought", "found", "met", "exchanged").',
      improvementsEn:
        'To make your response even richer, use transition words such as "At first", "Later on", and "Fortunately in the end".',
      improvementsEs:
        'Para enriquecer aún más tu respuesta, utiliza conectores como "At first" (Al principio), "Later on" (Más tarde) y "Fortunately in the end" (Afortunadamente al final).',
      suggestedAdEn:
        'The story is called "Wrong Color" because the furniture store delivered the wrong chairs to each customer. Mr. Brown ordered a green chair, and Ms. Green ordered a brown chair, but the delivery company mixed them up! After work, Ms. Green carried the green chair to the store, but it was already closed. Luckily, she met Mr. Brown outside, who was carrying her brown chair. They happily exchanged chairs and both got what they wanted.',
      suggestedAdEs:
        'La historia se llama "Color Equivocado" porque la tienda de muebles entregó las sillas equivocadas a cada cliente. El Sr. Brown pidió una silla verde y la Sra. Green una silla marrón, ¡pero la empresa de reparto las confundió! Después del trabajo, la Sra. Green llevó la silla verde a la tienda, pero ya estaba cerrada. Afortunadamente, se encontró afuera con el Sr. Brown, quien llevaba su silla marrón. Intercambiaron las sillas con alegría y ambos obtuvieron lo que querían.',
    };
  }

  if (stars === 2) {
    const missing: string[] = [];
    const missingEs: string[] = [];
    if (!explainsWrongColor) {
      missing.push('explain why the story is titled "Wrong Color" (the mix-up between names and colors)');
      missingEs.push('explicar por qué la historia se titula "Color Equivocado" (la confusión entre nombres y colores)');
    }
    if (!mentionsMrBrownGreen) {
      missing.push('state clearly that Mr. Brown ordered a green chair');
      missingEs.push('mencionar claramente que el Sr. Brown pidió una silla verde');
    }
    if (!mentionsMsGreenBrown) {
      missing.push('state clearly that Ms. Green ordered a brown chair');
      missingEs.push('mencionar claramente que la Sra. Green pidió una silla marrón');
    }
    if (!explainsWhatHappened) {
      missing.push('explain what happened when they met outside the closed store and exchanged chairs');
      missingEs.push('explicar qué ocurrió cuando se encontraron frente a la tienda cerrada e intercambiaron las sillas');
    }

    const missingMsgEn =
      missing.length > 0
        ? `To improve, ${missing.join(', and ')}.`
        : 'Try adding more details from the story!';
    const missingMsgEs =
      missingEs.length > 0
        ? `Para mejorar, ${missingEs.join(' y ')}.`
        : '¡Intenta añadir más detalles de la historia!';

    return {
      attemptNumber,
      stars: 2,
      checklist,
      scoreSummaryEn:
        'Good effort! You answered part of the prompt, but some key story details are missing.',
      scoreSummaryEs:
        '¡Buen esfuerzo! Respondiste parte de las preguntas, pero faltan algunos detalles clave de la historia.',
      strengthsEn: `You wrote ${wordCount} words and captured the main idea of the story. Your vocabulary shows good comprehension!`,
      strengthsEs: `Escribiste ${wordCount} palabras y captaste la idea principal de la historia. ¡Tu vocabulario demuestra buena comprensión!`,
      correctionsEn: `${missingMsgEn} Remember that names and colors were mixed up: Ms. Green wanted brown, Mr. Brown wanted green.`,
      correctionsEs: `${missingMsgEs} Recuerda que los nombres y los colores estaban cruzados: la Sra. Green quería marrón y el Sr. Brown quería verde.`,
      improvementsEn:
        'Answer all 4 questions in order: 1) Why called "Wrong Color", 2) Who ordered green, 3) Who ordered brown, 4) What happened at the store.',
      improvementsEs:
        'Responde las 4 preguntas en orden: 1) Por qué se llama "Wrong Color", 2) Quién pidió verde, 3) Quién pidió marrón, 4) Qué ocurrió en la tienda.',
      suggestedAdEn:
        'The story is called "Wrong Color" because Ms. Green got a green chair and Mr. Brown got a brown chair by mistake! Mr. Brown ordered the green chair, and Ms. Green ordered the brown chair. In the end, they met outside the closed store and exchanged their chairs.',
      suggestedAdEs:
        'La historia se llama "Color Equivocado" porque la Sra. Green recibió una silla verde y el Sr. Brown una silla marrón ¡por error! El Sr. Brown pidió la silla verde y la Sra. Green pidió la silla marrón. Al final, se encontraron frente a la tienda cerrada e intercambiaron sus sillas.',
    };
  }

  // stars === 1
  return {
    attemptNumber,
    stars: 1,
    checklist,
    scoreSummaryEn: 'Needs more detail. Answer all four questions from the prompt.',
    scoreSummaryEs: 'Necesita más detalles. Asegúrate de responder las cuatro preguntas del ejercicio.',
    strengthsEn: `You started writing (${wordCount} words). Keep going! You have up to 2 AI feedback reviews to improve it.`,
    strengthsEs: `Comenzaste a escribir (${wordCount} palabras). ¡Continúa! Tienes hasta 2 revisiones con IA para mejorarlo.`,
    correctionsEn:
      'Make sure you answer all 4 questions: 1. Why is it called "Wrong Color"? 2. Who ordered a green chair? (Mr. Brown). 3. Who ordered a brown chair? (Ms. Green). 4. What happened? (They met outside the store and exchanged chairs).',
    correctionsEs:
      'Asegúrate de responder las 4 preguntas: 1. ¿Por qué se llama "Wrong Color"? 2. ¿Quién pidió la silla verde? (Mr. Brown). 3. ¿Quién pidió la marrón? (Ms. Green). 4. ¿Qué pasó? (Se encontraron frente a la tienda e intercambiaron sillas).',
    improvementsEn:
      'Write complete sentences. For example: "The story is called Wrong Color because... Mr. Brown ordered... Ms. Green ordered... They met and..."',
    improvementsEs:
      'Escribe oraciones completas. Por ejemplo: "The story is called Wrong Color because... Mr. Brown ordered... Ms. Green ordered... They met and..."',
    suggestedAdEn:
      'The story is called "Wrong Color" because the store delivered the wrong chairs. Mr. Brown ordered a green chair, and Ms. Green ordered a brown chair. In the evening, they met outside the store and exchanged chairs happily.',
    suggestedAdEs:
      'La historia se llama "Color Equivocado" porque la tienda entregó las sillas equivocadas. El Sr. Brown pidió una silla verde y la Sra. Green una silla marrón. Por la noche, se encontraron frente a la tienda e intercambiaron las sillas felizmente.',
  };
}

export function evaluateRockCityHeuristically(
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
      correctionsEn:
        'Your grammar and sentence structure are very clear. To sound even more like a native salesperson, add energetic punctuation like exclamation marks (!) and phrases such as "Don\'t miss out!" or "Call today!".',
      correctionsEs:
        'Tu gramática y estructura son muy claras. Para sonar aún más como un vendedor nativo, añade signos de exclamación (!) y frases enérgicas como "Don\'t miss out!" (¡No te lo pierdas!) o "Call today!".',
      improvementsEn:
        'Make sure your telephone number is repeated twice so callers don\'t forget it, just like Chuck Wood did ("That number was 555-9663").',
      improvementsEs:
        'Asegúrate de repetir el número de teléfono dos veces para que no lo olviden, tal como hizo Chuck Wood ("That number was 555-9663").',
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
      improvementsEn:
        'Structure your ad with three parts: 1) Greeting & introduction, 2) Price comparison & free CD bonus, 3) Call to action with phone number.',
      improvementsEs:
        'Estructura tu anuncio en tres partes: 1) Saludo y presentación, 2) Comparación de precios y regalo del CD, 3) Llamado a la acción con tu número de teléfono.',
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
