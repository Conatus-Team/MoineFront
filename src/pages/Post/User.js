import React, {useState} from "react";

const User = ({ onSaveData}) => {
    const [form, setForm] = useState({
        name: '',
        group:'',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm({
            ...form,
            [name]: value
        })
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onSaveData(form)
        console.log(form);
        setForm({
            author: '',
            groupName:'',
            title: '',
            thumbnail: '',
            content: '',

        })

    }
    return (
        <>
        <div>Add User</div>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="author">
                    <input required placeholder="please enter the name" type= "text" name="author" value={form.author} onChange = {handleChange} />
                </label>
                <label htmlFor="groupName">
                    <input required placeholder="please enter the group name" type="text" name="groupName" value={form.groupName} onChange ={handleChange}/>
                </label>
                <label htmlFor="thumbnail">
                    <input required placeholder="please enter the thumbnail" type="text" name="thumbnail" value={form.thumbnail} onChange ={handleChange}/>
                </label>
                <label htmlFor="title">
                    <input required placeholder="please enter the title" type="text" name="title" value={form.title} onChange ={handleChange}/>
                </label>
                <label htmlFor="content">
                    <input required placeholder="please enter the content" type="text" name="content" value={form.content} onChange ={handleChange}/>
                </label>
            </div>
            <div>
                <button type="submit"> submit</button>
            </div>
        </form>
        </>
    )
}

export default User;