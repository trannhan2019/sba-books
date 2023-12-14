import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/pages/auth/Login";
import AdminGuard from "@/components/guards/AdminGuard";
import ManagerGuard from "@/components/guards/ManagerGuard";
import PrivateLayout from "@/components/layouts/private-layout";
import ManageCompany from "@/pages/private/manage-company";
import ManageDepartment from "@/pages/private/manage-department";
import ManageRole from "@/pages/private/manage-role";
import ManageUser from "@/pages/private/manage-user";
import ManageCategoryBook from "@/pages/private/manage-category-book";
import ManageBook from "@/pages/private/manage-book";
import Book from "@/pages/private/book";
import BookDetail from "@/pages/private/book/detail";
import ManageBookHistory from "@/pages/private/manage-book-history";
import BookHistory from "@/pages/private/book-history";
import ManageBookNotification from "@/pages/private/manage-notification";
import Account from "@/pages/private/account";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<PrivateLayout />}>
          <Route index element={<Book />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/book-history" element={<BookHistory />} />
          <Route path="/account" element={<Account />} />
          <Route
            path="manage-company"
            element={
              <AdminGuard>
                <ManageCompany />
              </AdminGuard>
            }
          />
          <Route
            path="manage-department"
            element={
              <AdminGuard>
                <ManageDepartment />
              </AdminGuard>
            }
          />
          <Route
            path="manage-role"
            element={
              <AdminGuard>
                <ManageRole />
              </AdminGuard>
            }
          />
          <Route
            path="manage-user"
            element={
              <AdminGuard>
                <ManageUser />
              </AdminGuard>
            }
          />
          <Route
            path="manage-category-book"
            element={
              <ManagerGuard>
                <ManageCategoryBook />
              </ManagerGuard>
            }
          />
          <Route
            path="manage-book"
            element={
              <ManagerGuard>
                <ManageBook />
              </ManagerGuard>
            }
          />
          <Route
            path="manage-book-history"
            element={
              <ManagerGuard>
                <ManageBookHistory />
              </ManagerGuard>
            }
          />
          <Route
            path="manage-book-notification"
            element={<ManageBookNotification />}
          />
        </Route>

        {/* <Route path="*" element={<PageNotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
