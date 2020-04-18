export const settleCalculator = (balances) => {
    if (!balances) throw new Error('Error: Can not find balances in settle calculator!');

    let settles = {};
    const people = Object.keys(balances);
    const valuesPaid = Object.values(balances);
    const sum = valuesPaid.reduce((acc, curr) => curr + acc);
    const mean = sum / people.length;
    const sortedPeople = people.sort((personA, personB) => balances[personA] - balances[personB]);
    const sortedValuesPaid = sortedPeople.map((person) => balances[person] - mean);

    let i = 0;
    let j = sortedPeople.length - 1;
    let debt;

    while (i < j) {
      debt = Math.min(-(sortedValuesPaid[i]), sortedValuesPaid[j]);
      sortedValuesPaid[i] += debt;
      sortedValuesPaid[j] -= debt;

      // Filling the results object "settles"
      settles[sortedPeople[i]] = {
        amount: debt,
        to: sortedPeople[j]
      }
      
      if (sortedValuesPaid[i] === 0) {
        i++;
      }

      if (sortedValuesPaid[j] === 0) {
        j--;
      }
    }

    return settles;
}