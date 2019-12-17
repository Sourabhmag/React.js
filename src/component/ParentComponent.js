import React, { Component } from 'react'
import ChildComponent from './ChildComponent'

export class ParentComponent extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            parentName:'Parent'
       }
       this.greedParent = this.greedParent.bind(this)
    }
    greedParent(Pandu){
        alert(`hello ${this.state.parentName} from ${Pandu}`)
    }
    render() {
        return (
            <div>
                <ChildComponent greedHandler = {this.greedParent}/>
            </div>
        )
    }
}

export default ParentComponent
