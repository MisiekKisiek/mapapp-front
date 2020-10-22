import React,{ useContext} from 'react';

//Context
import AppLoggedContext from "../context/AppLoggedContext";

const AlertComponent = () => {

    const {handleAlertComponentVisibility, alertComponentVisibility} = useContext(AppLoggedContext);

    const acceptButtonFunc = (e)=>{
        e.preventDefault();
        alertComponentVisibility.callback()
        handleAlertComponentVisibility();
    }

    const cancelButtonFunc = (e) => {
        e.preventDefault();
        handleAlertComponentVisibility();
    }

    return (<>
        <div className="alert">
            <div className="alert__courtine"/>
            <div className="alert__wrap-message">
                <h2 className="alert__title">Message</h2>
                <div className="alert__message">{alertComponentVisibility.message}</div>
                <form className="alert__form">
                    <button
                        className="alert__btn"
                        onClick={acceptButtonFunc}
                    >
                        Ok
                    </button>
                    <button
                        className="alert__btn"
                        onClick={cancelButtonFunc}
                    >
                        Cancel
            </button>
                </form>
            </div>
        </div>
    </>);
}

export default AlertComponent;