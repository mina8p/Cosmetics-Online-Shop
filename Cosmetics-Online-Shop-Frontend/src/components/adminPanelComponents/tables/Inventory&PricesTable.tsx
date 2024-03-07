import { Product } from "../../../pages/admin/adminPanelProducts";
import { useQuery } from "react-query";
import { fetchsubcategoryProducts } from "../../../api/fetchsubcategorybyid";

export default function PriceTable({
  _id,
  name,
  thumbnail,
  price,
  quantity,
  subcategory,
}: Product) {
  //////////////////////
  const { data: subCategoryIdData } = useQuery([`subCategoryId`], () =>
    fetchsubcategoryProducts(subcategory)
  );
  console.log(subCategoryIdData);
  //////////////////////

  return (
    <tr key={_id}>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
        <img
          src={`http://localhost:8000/images/products/thumbnails/${thumbnail}`}
          alt={name}
          className="w-40  object-contain m-auto"
        />
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
        {name}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
        

        <p className="font-IRANSans">
          {subCategoryIdData?.data?.subcategory?.category?.name}/
          {subCategoryIdData?.data?.subcategory?.name}
        </p>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
        {price}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
        {quantity}
      </td>
    </tr>
  );
}
