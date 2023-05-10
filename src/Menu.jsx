function Menu(props) {
    const {title,name} = props
    return(
        <nav id={name}>
            <span>{name}{title}</span>
        </nav>
    )
}
export default Menu