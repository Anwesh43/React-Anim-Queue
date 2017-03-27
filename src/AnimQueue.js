import React,{Component} from 'react'
class Transformation extends Component {
    constructor(props) {
        super(props)
        this.state = {style:[]}
    }
}
export default class AnimQueue extends Component {
    constructor(props) {
        super(props)
        this.state = {queue:[],style:this.props.style}
    }
    componentDidMount() {
        const childrenProps = this.props.children.map((child)=>child.props)

        var queue = this.state.queue
        childrenProps.forEach((childProps)=>{
            if(childProps.type!=undefined  && childProps.to!=undefined && childProps.from!=undefined && childProps.axis!=undefined && childProps.duration!=undefined) {
                var queueObj = {}
                queueObj.lastPart = 'px'
                if(childProps.type=='rotate') {
                    queueObj.lastPart = 'deg'
                }
                queueObj.transformFn = `${childProps.type}${childProps.axis}`
                queueObj.counter = 0
                queueObj.till = childProps.duration/100
                queueObj.speed = (childProps.to - childProps.from)/queueObj.till
                queueObj.curr = parseInt(childProps.from)
                queue.push(queueObj)
            }
        })
        this.setState({queue})
        var prevTransform = ""
        const intervalObj = setInterval(()=>{
            var queue = this.state.queue
            var style = Object.assign({},this.state.style)
            console.log(queue)
            console.log(style)
            if(queue.length>0 && style!=undefined) {
                var firstObj = queue[0]
                style.WebkitTransform = `${prevTransform}${firstObj.transformFn}(${firstObj.curr}${firstObj.lastPart})`
                style.MozTransform = `${prevTransform}${firstObj.transformFn}(${firstObj.curr}${firstObj.lastPart})`
                style.OTransform = `${prevTransform}${firstObj.transformFn}(${firstObj.curr}${firstObj.lastPart})`
                style.transform = `${prevTransform}${firstObj.transformFn}(${firstObj.curr}${firstObj.lastPart})`
                firstObj.curr += parseInt(firstObj.speed)
                firstObj.counter++
                if(firstObj.counter == firstObj.till+1) {
                    queue.splice(0,1)
                    prevTransform = style.transform
                }
                this.setState({style,queue})
            }
            else {
                clearInterval(intervalObj)
            }

        },100)
    }
    render() {
        return <div style={this.state.style}></div>
    }
}
export {Transformation}
