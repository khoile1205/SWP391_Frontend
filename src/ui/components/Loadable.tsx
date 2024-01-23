import { LazyExoticComponent, Suspense } from "react";
import { Loading } from "./Loading";

const Loadable = (Component: LazyExoticComponent<() => JSX.Element>) => () => (
	<Suspense fallback={<Loading></Loading>}>
		<Component />
	</Suspense>
);

export { Loadable };
