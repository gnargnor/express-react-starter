const CHANGE_ACKNOWLEDGEMENT = 'CHANGE_ACKNOWLEDGEMENT';
export const changeAcknowledgement = () => {
    return async (dispatch) => {
        return dispatch({type: CHANGE_ACKNOWLEDGEMENT, payload: ''})
    }
}

const CHANGE_PERSONAL_QUESTION = 'CHANGE_PERSONAL_QUESTION';
export const changePersonalQuestion = () => {
    return async (dispatch) => {
        return dispatch({type: CHANGE_PERSONAL_QUESTION, payload: ''})
    }
}

const acknowledgements = [
    'Howdy fella',
    'G\'day mate',
    'Hail Satan',
    'Ayyyyyyyyy',
    'Pardon me'
];

const personalQuestions = [
    'what it do',
    'how\'s it hangin\'',
    'can I have a dollar',
    'what\'s that smell'
];

const INITIAL_STATE = {
    acknowledgement: acknowledgements[0],
    acknowledgements,
    personalQuestion: personalQuestions[0],
    personalQuestions
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case CHANGE_ACKNOWLEDGEMENT:
            return {...state, acknowledgement: action.payload};
        case CHANGE_PERSONAL_QUESTION:
            return {...state, personalQuestion: action.payload};
        default:
            return INITIAL_STATE;
    }
}