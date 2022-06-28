// import { createContext, useState, useEffect } from "react";

// import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

// // actual value you want to access with default values
// export const CategoriesContext = createContext({
//     categories: {},
// })

// export const CategoriesProvider = ({children}) => {
//     const [categories, setCategories] = useState({});
//     const value = {categories};

//     useEffect(() => {
//         const getCategories = async () => {
//             const categoryMap = await getCategoriesAndDocuments();
//             setCategories(categoryMap);
//         }
//         getCategories();
//     }, []);

//     return (
//         <CategoriesContext.Provider value={value}>
//             {children}
//         </CategoriesContext.Provider>
//     )
// }