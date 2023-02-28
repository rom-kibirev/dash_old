const InputReg = (props) => {
    
    console.log('\n ', props.disabled);

    return (
        <div>
            <label>{props.title}</label>
            <input
                name={props.name}
                type={props.type}
                disabled={props.ddisabled}
                title={props.value}
                value={props.value}
                maxLength={props.max}
            />
        </div>
    )
}

export default InputReg;