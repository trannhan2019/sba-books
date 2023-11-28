import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/pages/auth/Login";
import AdminGuard from "@/components/guards/AdminGuard";
import ManagerGuard from "@/components/guards/ManagerGuard";
import PrivateLayout from "@/components/layouts/private-layout";
import Company from "@/pages/private/manage-company";
import Department from "@/pages/private/manage-department";
import Role from "@/pages/private/manage-role";
import User from "@/pages/private/manage-user";
import CategoryBook from "@/pages/private/category-book";
import Book from "@/pages/private/manage-book";
import Book2 from "@/pages/private/book";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<PrivateLayout />}>
          <Route
            path="manage-company"
            element={
              <AdminGuard>
                <Company />
              </AdminGuard>
            }
          />
          <Route
            path="manage-department"
            element={
              <AdminGuard>
                <Department />
              </AdminGuard>
            }
          />
          <Route
            path="manage-role"
            element={
              <AdminGuard>
                <Role />
              </AdminGuard>
            }
          />
          <Route
            path="manage-user"
            element={
              <AdminGuard>
                <User />
              </AdminGuard>
            }
          />
          <Route
            path="manage-category-book"
            element={
              <ManagerGuard>
                <CategoryBook />
              </ManagerGuard>
            }
          />
          <Route path="manage-book" element={<Book />} />
        </Route>

        {/* <Route path="*" element={<PageNotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
