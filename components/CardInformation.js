import React from 'react';
import { InformationCircleIcon, CheckCircleIcon, ExclamationIcon, XCircleIcon } from '@heroicons/react/outline'

const CardInformation = (props) => {
    const { nature, texte, applicationNom } = props;

    function renderSwitchIcon(nature) {
        switch (nature) {
            case 'INFO':
                return <InformationCircleIcon className="h-7 w-7" />;
            case 'SUCCESS':
                return <CheckCircleIcon className="h-7 w-7" />;
            case 'WARNING':
                return <ExclamationIcon className="h-7 w-7" />;
            case 'ERROR':
                return <XCircleIcon className="h-7 w-7" />;
        }
    }

    function renderSwitchBgColor(nature) {
        switch (nature) {
            case 'INFO':
                return 'alert-info';
            case 'SUCCESS':
                return 'alert-success';
            case 'WARNING':
                return 'alert-warning';
            case 'ERROR':
                return 'alert-error';
        }
    }

    return (
        <div className="card bg-base-100 shadow-xl bg-info">
            <div className={`card-body ` + renderSwitchBgColor(nature)}>
                <div className="card-actions flex justify-between items-center">
                    {renderSwitchIcon(nature)}
                    <h2 className="card-title text-sm">{applicationNom}</h2>
                </div>

                <p>{texte}</p>
            </div>
        </div>
    );
};

export default CardInformation;