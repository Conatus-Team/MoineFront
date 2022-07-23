import React, {Component} from "react";

class groups extends Component {
    static defaultData = {
        info: {
            id: 0,
            groupName: 'Happy cooking',
            thumbnail: "../../public/assets/emotion1.png"
        }
    }
    render(){
        const style = {
            border: '1px solid gray',
            padding: '8px',
            margin: '8px'
        };
        const {
            id, groupName, thumbnail
        } = this.props.info;

        return (
            <div style={style}>
                <div><b>{groupName}</b></div>
                <div><img alt="thumbnail" src={thumbnail}/></div>
            </div>
        )
    }
}
export default groups;
