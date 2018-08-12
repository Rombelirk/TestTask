import styled from "styled-components";
const {div} = styled;

const Styled = {
    FlightsWrapper: styled.div `
        flex-direction: column;
        min-height: 400px;
        max-height: 400px;
        overflow-y: auto;
        
    `,

    Flight: styled.div`
        border: 1px solid #278e27;
        height: 40px;
        background-color: ${props => props.selected ? "#83b983" : "white"};
        color: ${props => props.selected ? "white" : "auto"};
        
        :not(:last-child) {
            border-bottom: none;
        }

        > div {
            flex:1;
            justify-content: center;
            align-items: center;
          
        } 
    `,

    Header: styled.div `
    
         > div {
            flex:1;
            justify-content: center;
            align-items: center;
          
        } 
          background-color: #c9fab5;
          border: 1px solid #278e27;
          
          :not(:last-child) {
                border-bottom: none;
           }
        
          
    `,

    Column: styled.div `

        
        //:not(:last-child) {
        //    border-right: 1px solid #278e27;
        //}
        
        font-size: 12px;
    `,
    Depcity: styled.div `
        
    `,

    Arrcity: styled.div `

    `,

    DateFrom: styled.div `

    `,

    DateTo: styled.div `

    `,

    FlightTime: styled.div `

    `,

    AirCompany: styled.div `

    `,

    Transfers: styled.div `

    `,

    Price: styled.div `

    `
}

export default Styled;