const config = {
  tabs:{
    learn: {
      name: 'Learn',
      numberOfSteps: 3,
      currentStep: 1,
      visible: true,
      params:{
        step: 1
      }
    },
    common: {
      name: 'Common Examples',
      numberOfSteps: 2,
      currentStep: 1,
      visible: true,
      params:{
        step: 1
      }
    },
    quiz: {
      name: 'Quiz',
      visible: true,
      params: {},
      numberOfQuestions: 1
    },
    challenge: {
      name: 'Challenge',
      visible: true,
      params: {},
      numberOfQuestions: 1
    }
  }
}

export default config
