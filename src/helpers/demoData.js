
export const demoGroup = (userId, email, timestamp) =>  {
  const data = {
    groupMembers: {
      [userId]: {
        color: 'green-500',
        displayName: 'DemoUser',
        email: email,
        role: 'creator'
      },
      'demo-person-a1': {
        color: 'teal-700',
        displayName: 'Kate',
        email: 'kate@road-acc-demo.xxx',
        role: 'npc'
      }, 
      'demo-person-a2': {
        color: 'orange-800',
        displayName: 'Harry',
        email: 'harry@road-acc-demo.xxx',
        role: 'npc'
      },
      'demo-person-a3': {
        color: 'orange-800',
        displayName: 'Edward',
        email: 'edward@road-acc-demo.xxx',
        role: 'npc'
      }
    },
    creator: {
      name: 'DemoUser',
      email: email,
      id: userId
    },
    createDate: timestamp,
    demo: true,
    lastActivity: timestamp,
    lastSettled: null,
    name: 'Trip to Paris',
    transactions: {
      [timestamp]: {
        amount: 120.00,
        desc: 'Had a nice dinner together!',
        dividedAmount: 30.00, 
        payers: ['demo-person-a3'],
        spenders: ['demo-person-a1', 'demo-person-a2', 'demo-person-a3', userId],
        timestamp: timestamp,
        type: 'expense'
      }
    }      
  };
  
  return data

};