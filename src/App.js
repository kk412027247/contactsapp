import React, { Component } from 'react';
import PropTypes from 'prop-types';


class ContactsAppContainer extends Component {
  constructor(){
    super();
    this.state = {
      contacts: []
    }
  }
  componentDidMount(){
    // fetch 默认是一个get形式发出请求，返回一个对象，然后要变成json对象，再then就可以出现请求后的数据了
    // fetch 默认发出的是一条相对路径的路由。
    fetch('/contacts.json')
      .then((response)=> response.json())
      .then((responseData)=>{
        this.setState({contacts:responseData})
      })
      .catch((error)=>{
        console.log(error)
      })
  }
  render(){
    return(
      <ContactsApp contacts = {this.state.contacts}/>
    )
  }
}


// 主要组件 包含 搜索栏、联系列表组件
// 子组件用回调函数副组件更新state
class ContactsApp extends Component {
  constructor(){
    super();
    this.state = {
      filterText: ''
    }
  }

  handleUserInput = (searchTerm) =>{
    this.setState({
      filterText: searchTerm
    })
  };

  render() {
    return (
      <div>
        <SearchBar filterText={this.state.filterText}
                   onUserInput={this.handleUserInput}
        />
        <ContactList contacts={this.props.contacts}
                     filterText={this.state.filterText}
        />
      </div>
    );
  }
}

ContactsApp.propTypes ={
  contacts: PropTypes.arrayOf(PropTypes.object)
};


// 单纯组件，接受两个来自父组件的props
class SearchBar extends Component {
  handleChange=(event)=>{
    this.props.onUserInput(event.target.value)
  };
  render(){
    return(
      <input type="search"
             placeholder='search'
             value={this.props.filterText}
             onChange={this.handleChange}
      />
    )
  }
}

SearchBar.propTypes = {
  filterText: PropTypes.string.isRequired,
  onUserInput: PropTypes.func.isRequired
};

class ContactList extends Component {
  render(){
    // array.filter(callback)方法，callback需要返回布尔值，将为真的值组成一个新的数组。
    let filteredContacts = this.props.contacts.filter(
      (contact)=>(contact.name.indexOf(this.props.filterText) !== -1)
    );
    return(
      <ul>
        {filteredContacts.map(
          (contact)=>(<ContactItem key={contact.email}
                                   name={contact.name}
                                   email={contact.email}/>)
        )}
      </ul>
    )
  }
}

ContactList.propTypes=  {
  contacts: PropTypes.arrayOf(PropTypes.object)
};


class ContactItem extends Component {
  render(){
    return(
      <li>{this.props.name} - {this.props.email}</li>
    )
  }
}

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};




export default ContactsAppContainer;
