import React, {Component} from 'react'
import firebase from 'firebase'
import _ from 'lodash'

class ChatRoom extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            message: "",
            messages: [
                {id: 0, text: 'hey'}, 
                {id: 1, text: 'hello'}               
            ]
        }
    }
    componentDidMount() {
        const rootRef = firebase.database().ref('messages/');
        
        rootRef.on('value', snapshot => {
            const messages = _.values(snapshot.val())
            console.log(messages)

            if (messages != null) {
                this.setState({messages})
            }
         
        })
    }

    renderMessages() {
        return this.state.messages.map((message) => { 
            return (
                <li  
                    key={message.id} 
                    className="list-group-item">{message.text}
                </li>
                )
        });        
    }
    render() {
        return (
            <div>
                This is the ChatRoom!
                <ol className="list-group col-sm-4">
                    {this.renderMessages()}
                </ol>
                <input 
                    type="text" 
                    placeholder="message"
                    onChange={(event) => this.onInputChange(event.target.value)}/>
                <br />
                <button
                    className="btn-danger"
                    onClick = {(event) => this.sendMessage(event)}>Send</button>
            </div>
        )
    }

    sendMessage(event) {
        //console.log(this.state.message)
        var message = {id: this.state.messages.length, text: this.state.message};
        //var messages = [... this.state.messages, message ]
        //this.setState({messages})

        firebase.database().ref('messages/' + message.id).set(message);
    }
    // define event handler to handle events - first step
	onInputChange(message) {
        this.setState({message});
	}
}

export default ChatRoom