// import { useAppSelector } from "@/store/reducers/store";
// import Box from "@mui/material/Box";
// import { Navigate } from "@tanstack/react-router";
// import { FC, ReactElement } from "react";

// export const PrivateRoute: FC<{ children: ReactElement }> = ({ children }) => {
//   const { isAuthenticated, loading } = useAppSelector((state) => state.auth);
//   return (
//     <Show when={!loading}>
//       <Show when={isAuthenticated} fallback={<Navigate to={"/"} />}>
//         <Box>{children}</Box>
//       </Show>
//     </Show>
//   );
// };
