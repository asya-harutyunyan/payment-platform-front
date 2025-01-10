import { LoginForm } from "@/auth";
import { createLazyFileRoute } from "@tanstack/react-router";
import styles from './index.module.scss'

const Index = () => {
  return (
   <div className={styles.wrapper}>
   <LoginForm />
 </div>
  );
};


export const Route = createLazyFileRoute("/")({
   component: Index,
 });