import React from 'react';
import ContactItem from './ContactItem';
import PropTypes from 'prop-types';

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

Contacts.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.object),
}

export default Contacts;