import React, {Component} from "react"
import styled from "styled-components"
import Handle from "./Handle"

const MainContainer = styled.div`
    flex-direction: column;
    width: ${props => props.width}px;
`
const Values = styled.div`
    justify-content: space-between;
    width: ${props => props.width}px;
    height: 20px;
`
const Container = styled.div`
    width: ${props => props.width}px;
    height: 20px;
    background-color: #dedede;
    position: relative;
    border-radius: ${props => props.borderRadius}px;
    box-shadow: inset 0 0 4px 1px rgba(167, 167, 167, 0.38);
`
const Interval = styled.div`
    border-radius: ${props => props.borderRadius}px;
    background: linear-gradient(to bottom, #b7df2d 0%,#c1e532 48%,#b7df2d 99%); 
    left: ${props => props.left}px;
    width: ${props => props.width}px;
    right: ${props => props.right}px;
    height: 100%;
    position: absolute;
`

const From = styled.div`
    user-select: none;
`

const To = styled.div`
user-select: none;
`

const Hours = styled.div`
   
`

const Minutes = styled.div`

`

const Title = styled.div`
  
`


class Filter extends Component{

    constructor(props) {
        super(props);
        this.state={
            fromTime: this.props.fromTime,
            toTime: this.props.toTime,
            isDragging: false,
            circleToTheLeft: 0,
            circleToTheRight: this.props.sliderWidth,
            circleToTheLeftPercent: 0,
            circleToTheRightPercent: this.props.startMax,
            sliderLeft: {
                1: 0,
                2: this.getPositionByPercent(this.props.startMax)
            },
        }

        this.sliderNode = {

        }

        this.lastX = 0;

        this.container = React.createRef();
        this.slider = React.createRef();
        this.onSliderMouseDown = this.onSliderMouseDown.bind(this);
        this.doDrag = this.doDrag.bind(this)
        this.onMouseMove = this.onMouseMove.bind(this)
        this.onMouseUp = this.onMouseUp.bind(this)

    }

    doDrag(e, id) {
        
        let delta = e.screenX - this.lastX;

       if (this.sliderNode[id].getBoundingClientRect().left + delta < this.containerNodeLeft) {
           delta = this.containerNodeLeft - this.sliderNode[id].getBoundingClientRect().left;  
       }

       if (this.sliderNode[id].getBoundingClientRect().right + delta > this.containerNodeRight) {
            delta = this.containerNodeRight - this.sliderNode[id].getBoundingClientRect().right;
        }

       if (delta !== 0) {


           let circleToTheLeft = (this.state.sliderLeft[1] < this.state.sliderLeft[2]) ? this.state.sliderLeft[1] : this.state.sliderLeft[2];
           let circleToTheRight = (this.state.sliderLeft[1] > this.state.sliderLeft[2]) ? this.state.sliderLeft[1] : this.state.sliderLeft[2];

           let circleToTheLeftId = (this.state.sliderLeft[1] <= this.state.sliderLeft[2]) ? 1 : 2

      

           circleToTheLeft = circleToTheLeft + /* this.props.circleDiameter/2 +  */delta;
           circleToTheRight = circleToTheRight + this.props.circleDiameter + delta;

           let circleToTheLeftPercent  = (id === circleToTheLeftId) ? Math.round(circleToTheLeft / (this.props.sliderWidth / 100)) : this.state.circleToTheLeftPercent;
           let circleToTheRightPercent = (id === circleToTheLeftId) ? this.state.circleToTheRightPercent : Math.round(circleToTheRight / (this.props.sliderWidth / 100));

            
           

           this.setState(state => {
               return {
                   ...state,
                   sliderLeft: {...state.sliderLeft, [id]: state.sliderLeft[id] + delta},
                   circleToTheLeftPercent,
                   circleToTheRightPercent,
                   circleToTheLeft: id === circleToTheLeftId ? circleToTheLeft : this.state.circleToTheLeft,
                   circleToTheRight: id === circleToTheLeftId ? this.state.circleToTheRight : circleToTheRight
               }
               
           })

           this.props.onIntervalChange(this.props.id, {min:circleToTheLeftPercent, max:circleToTheRightPercent})
           this.lastX = e.screenX;
       }
       

        
    }

    onMouseMove(e) {
            if (this.state.isDragging) {
                this.doDrag(e, this.state.draggingElementId)
            }
    }

    onMouseUp(event,id) {

        document.removeEventListener("mousemove", this.onMouseMove)
        document.removeEventListener("mouseup", this.onMouseUp)
     
            if (!this.state.isDragging) {
                return false
            }
            this.setState({
                isDragging: false
            })
      
    }

    onSliderMouseDown(e, id) {
        document.addEventListener("mousemove", this.onMouseMove)
        document.addEventListener("mouseup", this.onMouseUp)

        this.lastX = e.screenX;
        this.sliderNode[id] = e.target;
        
        this.containerNodeRight = e.target.parentNode.getBoundingClientRect().right;
        this.containerNodeLeft = e.target.parentNode.getBoundingClientRect().left;

        this.setState({
            isDragging: true,
            draggingElementId: id
        })

       
    }

    getPositionByPercent(percent) {
        return this.props.sliderWidth / 100 * percent - this.props.circleDiameter
    }


    render() {
        return (
            <MainContainer width={this.props.sliderWidth}>
                <Values width={this.props.sliderWidth}>
                     <From>
                        {typeof (+this.props.minValue) === "number" ?  this.props.minValue : this.state.circleToTheLeftPercent+"%"}
                    </From>
                    <Title>
                        {this.props.title}
                    </Title>
                    <To> 
                        {typeof (+this.props.maxValue) === "number" ? this.props.maxValue : this.state.circleToTheRightPercent+"%"}
                    </To>
                    
                </Values>
                <Container
                    borderRadius={this.props.circleDiameter}
                    width={this.props.sliderWidth}
                    ref={this.container}
                    onMouseMove={this.onSliderMouseMove}
                >
                    <Interval 
                        borderRadius={this.props.circleDiameter}
                        left={this.state.circleToTheLeft}
                        width={this.state.circleToTheRight - this.state.circleToTheLeft}

                    />
                
                        <Handle
                            diameter={this.props.circleDiameter}
                            key={1}
                            id={1}
                            left={this.state.sliderLeft[1]}
                            onMouseDown={this.onSliderMouseDown}
                        />
                        
                        <Handle
                            diameter={this.props.circleDiameter}
                            key={2}
                            id={2}
                            left={this.state.sliderLeft[2]}
                            onMouseDown={this.onSliderMouseDown}
                        />
                
                </Container>
            </MainContainer>
        )
    }
}

Filter.defaultProps = {
    onIntervalChange: f => f,
    circleDiameter: 20,
    sliderWidth: 1000,
    startMin: 0,
    startMax: 100
}

export default Filter