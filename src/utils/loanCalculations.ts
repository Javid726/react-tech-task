export const calculateOverallCreditAmount = (
  creditAmount: number,
  interest: number,
  period: number,
): number => {
  const totalInterest = creditAmount * (interest / 100) * (period / 12);
  return creditAmount + totalInterest;
};

export const generatePaymentSchedule = (
  creditAmount: number,
  interest: number,
  period: number,
) => {
  if (creditAmount <= 0 || period <= 0 || interest <= 0) {
    return { monthlyPayment: 0, schedule: [] };
  }

  const monthlyRate = interest / 100 / 12;
  const totalPayments = period;
  const monthlyPayment =
    (creditAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
    (Math.pow(1 + monthlyRate, totalPayments) - 1);

  const schedule = [];
  let balance = creditAmount;

  for (let i = 1; i <= totalPayments; i++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    balance -= principalPayment;

    schedule.push({
      id: i,
      month: i,
      monthlyPayment: parseFloat(monthlyPayment.toFixed(2)),
      principal: parseFloat(principalPayment.toFixed(2)),
      interest: parseFloat(interestPayment.toFixed(2)),
      balance: parseFloat(balance.toFixed(2)),
    });
  }

  return { monthlyPayment, schedule };
};
