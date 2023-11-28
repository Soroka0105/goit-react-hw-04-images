import { useEffect } from 'react'
import css from "./modal.module.css"

export const Modal = ({children, close}) => {
const backDropClose = (e) => {
		e.target === e.currentTarget && close()
	}
const handleEsc = (e) => {
		e.code === 'Escape' && close()
    }

    useEffect(() => {
      document.addEventListener('keydown', handleEsc)
      return () => document.removeEventListener('keydown', handleEsc)
    }, )
 
  
      
        return (
        <div className={css.Overlay} onClick={backDropClose}>
  <div className={css.Modal}>
                    <img src={children} alt={children.id} />
                    
  </div>
</div>
    )
    
    
}