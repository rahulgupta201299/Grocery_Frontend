export const setCart = cart=>({
    type: 'SET_CART',
    payload: cart
})
export const setCartItem=cart=>({
    type: 'SET_CART_ITEM',
    payload: cart
})
export const setTotalAmount=cart=>({
    type: 'SET_TOTAL_AMOUNT',
    payload: cart
})