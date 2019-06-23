export const contactPages = (
    [
        { link: '/contacts', title: 'Contacts API' },
        { link: '/contacts/all', title: 'Contacts API/All' },
        { link: '/contacts/add', title: 'Contacts API/Add' }
    ]
)

export const removePageByIndex = (index) => {
    return (
        contactPages.slice().filter(function(page) {
            return page !== contactPages[index]
        })
    )
}