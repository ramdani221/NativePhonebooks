const contacts = (state = { phonebooks: [], page: 1, limit: 10, total: 1, pages: 1 }, action) => {
    switch (action.type) {
        case 'LOAD_CONTACT_SUCCESS':
            return action.contacts
        case 'ADD_CONTACT_SUCCESS':
            const add = { phonebooks: [...state.phonebooks, action.data] }
            add.phonebooks.sort((a, b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                return 0;
            })
            return { ...state, ...add };
        case 'UPDATE_CONTACT_SUCCESS':
            const update = { phonebooks: [...(state.phonebooks.filter((contacts) => contacts.id !== action.data.id)), action.data] };
            update.phonebooks.sort((a, b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                return 0;
            });
            return { ...state, ...update };
        case 'DELETE_CONTACT_SUCCESS':
            return { ...state, phonebooks: state.phonebooks.filter((contacts) => contacts.id !== action.id) }
        case 'UPDATE_AVATAR_SUCCESS':
            return state;
        case 'LOAD_PAGE_SUCCESS':
            return { ...state, phonebooks: [...state.phonebooks, ...action.contacts.phonebooks], page: action.contacts.page }
        case 'LOAD_CONTACT_FAILED':
        case 'ADD_CONTACT_FAILED':
        case 'UPDATE_CONTACT_FAILED':
        case 'DELETE_CONTACT_FAILED':
        case 'UPDATE_AVATAR_FAILED':
        default:
            return state;
    }
}

export default contacts