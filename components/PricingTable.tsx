export default function PricingTable() {
  return (
    <table className="min-w-full border text-center">
      <thead>
        <tr>
          <th className="border p-2">Features</th>
          <th className="border p-2">Free</th>
          <th className="border p-2">Pro</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border p-2">Monthly price</td>
          <td className="border p-2">$0</td>
          <td className="border p-2">$9</td>
        </tr>
        <tr>
          <td className="border p-2">AI diagnostics</td>
          <td className="border p-2">✓</td>
          <td className="border p-2">✓</td>
        </tr>
        <tr>
          <td className="border p-2">Unlimited plans</td>
          <td className="border p-2">-</td>
          <td className="border p-2">✓</td>
        </tr>
      </tbody>
    </table>
  );
}
