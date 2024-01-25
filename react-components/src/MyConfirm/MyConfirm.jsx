import {Popover ,Button} from 'antd'

const MyConfirm = (props) => {

    const { onConfirm ,children}=props

    console.log(children.type.__ANT_BUTTON, );

    let _props = {
        ...props,
        className: 'my-confirm'
    }

    let btnProps={
        className: 'my-confirm'
    }

    const _children=()=>{
        if (children.length>1){

        }
    }

    return <Popover  {..._props} />
}

export default MyConfirm;
