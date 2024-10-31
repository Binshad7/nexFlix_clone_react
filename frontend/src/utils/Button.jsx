function Button({style,text,children}) {
  return (
    <button className={style}> {text} {children}</button>
  )
}

export default Button


