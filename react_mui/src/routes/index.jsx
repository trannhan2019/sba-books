import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/pages/auth/Login";
import AdminGuard from "@/components/guards/AdminGuard";
import ManagerGuard from "@/components/guards/ManagerGuard";
import PrivateLayout from "@/components/layouts/private-layout";
import Company from "@/pages/private/company";
import Department from "@/pages/private/department";
import Role from "@/pages/private/role";
import User from "@/pages/private/user";
import CategoryBook from "@/pages/private/category-book";
import Book from "@/pages/private/book";
import Book2 from "@/pages/private/book2";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<PrivateLayout />}>
          <Route
            path="company"
            element={
              <AdminGuard>
                <Company />
              </AdminGuard>
            }
          />
          <Route
            path="department"
            element={
              <AdminGuard>
                <Department />
              </AdminGuard>
            }
          />
          <Route
            path="role"
            element={
              <AdminGuard>
                <Role />
              </AdminGuard>
            }
          />
          <Route
            path="user"
            element={
              <AdminGuard>
                <User />
              </AdminGuard>
            }
          />
          <Route
            path="category-book"
            element={
              <ManagerGuard>
                <CategoryBook />
              </ManagerGuard>
            }
          />
          <Route path="book" element={<Book />} />
        </Route>

        {/* <Route path="*" element={<PageNotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
