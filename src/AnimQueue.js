import React,{Component} from 'react'
class Transformation extends Component {
    constructor(props) {
        super(props)
    }
}
export default class AnimQueue extends Component {
    constructor(props) {
        super(props)
        this.state = {queue:[]}
    }
    componentDidMount() {
        console.log(this.props.children)
        const childrenProps = this.props.children.map((child)=>child.props)
        const childrenRef = this.props.children.map((child)=>child.refs)
        console.log(childrenProps)
        console.log(childrenRef)
    }
    render() {
        return <div style={this.props.style}></div>
    }
}
export {Transformation}
