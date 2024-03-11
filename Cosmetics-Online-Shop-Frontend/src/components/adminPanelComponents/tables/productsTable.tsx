import { Product } from "../../../pages/admin/adminPanelProducts";
import { useQuery } from "react-query";
import { fetchsubcategoryProducts } from "../../../api/fetchsubcategorybyid";

export default function ProductTable({
  _id,
  name,
  thumbnail,
  subcategory,
}: Product) {
  //////////////////////
  const { data: subCategoryIdData } = useQuery([`subCategoryId`,subcategory], () => fetchsubcategoryProducts(subcategory)
  );
  console.log(subCategoryIdData);
  //////////////////////

  return (
    <tr key={_id}>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 ">
        <img
          src={`http://localhost:8000/images/products/thumbnails/${thumbnail}`}
          alt={name}
          className="w-40  object-contain m-auto"
        />
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 text-center">
        {name}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 text-center">
        

        <p className="font-IRANSans">
          {subCategoryIdData?.data?.subcategory?.category?.name}/
          {subCategoryIdData?.data?.subcategory?.name}
        </p>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 text-center">
        <button
          
          className="text-violet-600 hover:text-violet-900"
        >
          ویرایش
        </button>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 text-center">
        <button
          
          className="text-violet-600 hover:text-violet-900"
        >
          حذف
        </button>
      </td>
    </tr>
  );
}
