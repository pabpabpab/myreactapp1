import React from 'react';
import ContactItem from "./ContactItem";

const Contacts = ({ contacts, correspondentId, changeCorrespondentIdCB }) => {
    return (
        <div className="contacts">
            {
                contacts.map((contact) => {
                    return (
                        <ContactItem
                            contact={contact}
                            key={contact.userId}
                            correspondentId={correspondentId}
                            changeCorrespondentIdCB={changeCorrespondentIdCB}
                        />
                    )
                })
            }
        </div>
    );
};

export default Contacts;