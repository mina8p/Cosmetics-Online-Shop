import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { Product } from '../../../pages/admin/adminPanelProducts';
import { fetchsubcategoryProducts } from '../../../api/fetchsubcategorybyid'; 
import ModalConfirmDelete from '../../modals/modalConfirmDelete'; 
import { deleteProduct } from '../../../api/deleteProduct';


export default function ProductTable({
  _id,
  name,
  thumbnail,
  subcategory,
}: Product) {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);

  const { data: subCategoryIdData } = useQuery(
    [`subCategoryId`, subcategory],
    () => fetchsubcategoryProducts(subcategory)
  );

  const handleDelete = async (productId: string) => {
    await deleteProduct(productId);
    queryClient.invalidateQueries(['products']);
    setShowModal(false); 
  };

  return (
    <>
      <tr key={_id}>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">
          <img
            src={`http://localhost:8000/images/products/thumbnails/${thumbnail}`}
            alt={name}
            className="w-40 object-contain m-auto"
          />
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 text-center">{name}</td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 text-center">
          <p className="font-IRANSans">
            {subCategoryIdData?.data?.subcategory?.category?.name}/
            {subCategoryIdData?.data?.subcategory?.name}
          </p>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 text-center">
          <button className="text-violet-600 hover:text-violet-900">ویرایش</button>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 text-center">
          <button onClick={() => setShowModal(true)} className="text-violet-600 hover:text-violet-900">حذف</button>
        </td>
      </tr>
      {showModal && (
        <ModalConfirmDelete
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={() => handleDelete(_id)} />
      )}
    </>
  );
}

