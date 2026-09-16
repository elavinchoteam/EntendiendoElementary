import React from 'react';
import { WritingAiFeedbackExercise as WritingExerciseType } from '../../types';
import { WritingAiFeedbackExercise } from '../WritingAiFeedbackExercise';
import {
  PEOPLE_CRAZY_ABOUT_SPORTS_STORY,
  SPORTS2_ACT7_WRITING,
} from '../../data/peopleCrazyAboutSportsData';

interface Sports2Activity7WritingProps {
  accent?: 'US' | 'UK';
  speechRate?: number;
  onComplete?: () => void;
}

export const Sports2Activity7Writing: React.FC<Sports2Activity7WritingProps> = ({
  accent = 'US',
  speechRate = 1.0,
  onComplete,
}) => {
  const exercise: WritingExerciseType = {
    id: 'sports2-act7-writing',
    type: 'writing-ai-feedback',
    title: 'Assignment: People Are Crazy About Sports',
    titleEs: 'Tarea: La Gente Está Loca por los Deportes',
    instructions: SPORTS2_ACT7_WRITING.instructionsEn,
    instructionsEs: SPORTS2_ACT7_WRITING.instructionsEs,
    prompt: SPORTS2_ACT7_WRITING.promptEn,
    promptEs: SPORTS2_ACT7_WRITING.promptEs,
    maxAiRequests: 2,
    initialWordsTarget: 30,
    placeholder: SPORTS2_ACT7_WRITING.placeholder,
    storyContext: SPORTS2_ACT7_WRITING.storyContext,
    story: {
      title: PEOPLE_CRAZY_ABOUT_SPORTS_STORY.title,
      titleEs: PEOPLE_CRAZY_ABOUT_SPORTS_STORY.titleEs,
      author: PEOPLE_CRAZY_ABOUT_SPORTS_STORY.author,
      authorEs: PEOPLE_CRAZY_ABOUT_SPORTS_STORY.authorEs,
      textEn: PEOPLE_CRAZY_ABOUT_SPORTS_STORY.paragraphsEn.join('\n\n'),
      textEs: PEOPLE_CRAZY_ABOUT_SPORTS_STORY.paragraphsEs.join('\n\n'),
      paragraphsEn: PEOPLE_CRAZY_ABOUT_SPORTS_STORY.paragraphsEn,
      paragraphsEs: PEOPLE_CRAZY_ABOUT_SPORTS_STORY.paragraphsEs,
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <WritingAiFeedbackExercise
        exercise={exercise}
        accent={accent}
        speechRate={speechRate}
        onSuccess={onComplete}
      />
    </div>
  );
};
