/** Visit every review once, avoiding a repeat at the boundary between cycles. */
export function shuffledReviewOrder(count: number, previous = -1): number[] {
  const order = Array.from({ length: count }, (_, index) => index);
  for (let index = order.length - 1; index > 0; index--) {
    const other = Math.floor(Math.random() * (index + 1));
    [order[index], order[other]] = [order[other], order[index]];
  }
  if (order.length > 1 && order[0] === previous) {
    [order[0], order[1]] = [order[1], order[0]];
  }
  return order;
}
