export default function packMessagesIntoMap(messages) {
    const map = new Map();
    messages.forEach((item) => {
        map.has(item.userId)
            ? map.set(item.userId, [ ...map.get(item.userId), ...[item] ])
            : map.set(item.userId, [item])
    })
    return map;
};