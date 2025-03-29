// interface NewsState {
//   data: any[];
//   loading: boolean;
//   error: string | null;
//   cacheTimestamp: number;
// }

// const initialState: NewsState = {
//   data: [],
//   loading: false,
//   error: null,
//   cacheTimestamp: 0,
// };

// type Action =
//   | { type: "SET_LOADING"; payload: boolean }
//   | { type: "SET_NEWS_DATA"; payload: any[] }
//   | { type: "SET_ERROR"; payload: string }
//   | { type: "SET_CACHE_TIMESTAMP"; payload: number };

// const newsReducer = (state: NewsState, action: Action): NewsState => {
//   switch (action.type) {
//     case "SET_LOADING":
//       return { ...state, loading: action.payload };
//     case "SET_NEWS_DATA":
//       return { ...state, data: action.payload };
//     case "SET_ERROR":
//       return { ...state, error: action.payload };
//     case "SET_CACHE_TIMESTAMP":
//       return { ...state, cacheTimestamp: action.payload };
//     default:
//       return state;
//   }
// };

// export { newsReducer, initialState };
