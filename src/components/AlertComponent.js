import React from 'react';

const AlertComponent = () => {
    return (<>
        <div className="alert alert--active">
            <div
                className="alert__courtine"
                onClick={(e) => {
                }}
            ></div>
            <div className="alert__wrap-message">
                <h2 className="alert__title">Message</h2>
                <div className="alert__message">tfasfasfasfas</div>
                <form className="alert__form">
                    <button
                        className="alert__btn"
                        onClick={(e) => {
                        }}
                    >
                        Ok!
                    </button>
                    <button
                        className="alert__btn"
                        onClick={(e) => {
                        }}
                    >
                        Ok!
            </button>
                </form>
            </div>
        </div>
    </>);
}

export default AlertComponent;