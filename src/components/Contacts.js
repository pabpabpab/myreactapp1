import React from 'react';
import ContactItem from "./ContactItem";

const Contacts = ({ contacts }) => {
    return (
        <div className="contacts">
            {
                contacts.map((contact) => {
                    return (
                        <ContactItem
                            contact={contact}
                            key={contact.userId}
                        />
                    )
                })
            }
        </div>
    );
};

export default Contacts;