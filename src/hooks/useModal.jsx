import { useState } from "react"

export const useModal = () => {
    const [showModal, setShowModal] = useState(false)

    /**
     * 
     * @param {boolean?} overwriteValue 
     */
    const toggleModal = (overwriteValue) => {

        console.log('toggle pressed currentvalue: ' + showModal + ' overwritevalue: ' + overwriteValue)

        if(overwriteValue) {
            setShowModal(overwriteValue) 
        } else {
            setShowModal(!showModal)
        }
    }

    return {showModal, toggleModal}
}
