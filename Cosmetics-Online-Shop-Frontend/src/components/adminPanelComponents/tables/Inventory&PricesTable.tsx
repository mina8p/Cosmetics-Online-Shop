import { Product } from "../../../pages/admin/adminPanelProducts";

export default function PriceTable({
  _id,
  name,
  thumbnail,
  price,
  quantity,
}: Product) {
  return (
    <tr key={_id}>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 ">
        <img
          src={`http://localhost:8000/images/products/thumbnails/${thumbnail}`}
          alt={name}
          className="w-32  object-contain m-auto"
        />
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 text-center">
        {name}
      </td>

      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 text-center">
        {price}
        {"   تومان"}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 text-center">
        {quantity}
        {"   عدد"}
      </td>
    </tr>
  );
}


