import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from "./styles.module.scss"
const RadioButtons = ({ setInternalState }) => {
    const dispatch = useDispatch()
    const { params: { journeyType }, reservations } = useSelector((state) => state.pickUpDropOffActions)

    const handleInputRadioChange = (index) => {
        dispatch({ type: 'SWITCH_JOURNEY', data: { journeyType: index } })
    }

    //when we change journey to return then we should check If we have points or not.
    //In this way we arrange addExtra point to false or to true
    useEffect(() => {
        if (parseInt(journeyType) === 1) {
            if (reservations[1].selectedPickupPoints.length > 0)
                setInternalState({ [`show-pickup-extra-point-${journeyType}`]: true })
            if (reservations[1].selectedDropoffPoints.length > 0)
                setInternalState({ [`show-dropoff-extra-point-${journeyType}`]: true })
        }
    }, [journeyType])


    return (
        <>
            <ul className={styles.radio_text_header_ul}>
                <li><span>Airport Transfer Quotations</span></li>
            </ul>
            <span className={styles.radio_button_div}>
                <input type="radio" id="check1" onChange={() => handleInputRadioChange(0)} checked={parseInt(journeyType) === 0 ? true : false} />
                <label htmlFor="check1" onClick={() => handleInputRadioChange(0)} id="check1">One way</label>
                &nbsp;&nbsp;
                &nbsp;&nbsp;
                &nbsp;&nbsp;
                <input type="radio" id="check2" onChange={() => handleInputRadioChange(1)} checked={parseInt(journeyType) === 1 ? true : false} />
                <label htmlFor="check2" onClick={() => handleInputRadioChange(1)} >Return</label>
            </span>
        </>
    )
}

export default RadioButtons