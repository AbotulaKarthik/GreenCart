import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

import axios from 'axios'

const AppContext = createContext();

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL

export const AppContextProvider = ({children})=> {

    const currency = import.meta.env.VITE_CURRENCY

    const navigate = useNavigate()

    const [user,setUser] = useState(null)
    const [isSeller,setIsSeller] = useState(false)
    const [showUserLogin,setShowUserLogin] = useState(false)

    const [products,setProducts] = useState([])

    const [cartItems,setCartItems] = useState({})

    const [searchQuery,setSearchQuery] = useState("")

    // fetch seller status -------_-____---_____--
    const fetchSeller = async ()=>{
        try {
            const {data} = await axios.get('/api/seller/is-auth')
            if(data.success){
                setIsSeller(true)
            }else{
                setIsSeller(false)
            }
        } catch (error) {
            setIsSeller(false)
        }
    }

    // fetch user status, user data and cart items -------_-____---_____--
    const fetchUser = async ()=>{
        try {
            const {data} = await axios.get('/api/user/is-auth')
            if(data.success){
                setUser(data.user)
                setCartItems(data.user.cartItems)
            }
        } catch (error) {
            setIsSeller(false)
        }
    }

    //// add product to cart --------------------------------
    const addToCart = (itemId)=>{
        let cartData = structuredClone(cartItems)
        if(cartData[itemId]){
            cartData[itemId] += 1
        }else{
            cartData[itemId] = 1
        }
        setCartItems(cartData)
        toast.success('Added to Cart')
    }
    //// update Cart item quantity ----------------
    const updateCartItem = (itemId,quantity)=>{
        let cartData = structuredClone(cartItems)
        cartData[itemId] = quantity;
        setCartItems(cartData)
        toast.success('Cart Updated')
    }
    //// remove product from cart -----------------
    const removeFromCart = (itemId)=>{
        let cartData = structuredClone(cartItems)
        if(cartData[itemId]){
            cartData[itemId] -= 1;
            if(cartData[itemId] === 0){
                delete cartData[itemId]
            }
        }
        toast.success("Item removed from Cart")
        setCartItems(cartData)
    }

    //// fetching the products --------------#########-----------------
    const fetchProducts = async ()=> {
        try {
            const {data} = await axios.get('/api/product/list')
            if(data.success){
                setProducts(data.products)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


    //// get cart item count ---------------
    const getCartCount = ()=>{
        let totalCount = 0;
        for(const item in cartItems){
            totalCount += cartItems[item]
        }
        return totalCount
    }

    //// get total cart amount -----------------------
    const getCartAmount = ()=>{
        let totalCost = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product)=> product._id === items)
            if(cartItems[items]>0){
                totalCost += itemInfo.offerPrice*cartItems[items]
            }
        }
        return Math.floor(totalCost*100)/100;
    }

    useEffect(()=>{
        fetchSeller()
        fetchUser()
        fetchProducts()
    },[])

    /// updating database cart item -------------
    useEffect(()=>{
        const fetchCartItems = async ()=>{
            try {
                const {data} = await axios.post('/api/cart/update',{cartItems})
                if(!data.success){
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error(error.message)
            }
        }
        if(user){
            fetchCartItems()
        }
    },[cartItems])

    const value = {navigate,user,setUser,isSeller,setIsSeller,showUserLogin,
        setShowUserLogin,products,currency,addToCart,updateCartItem,removeFromCart,
        cartItems,searchQuery,setSearchQuery,getCartCount,getCartAmount,axios,fetchProducts,setCartItems
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = ()=>{
    return useContext(AppContext)
}