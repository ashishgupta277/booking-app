import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from '../api-client'
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = () => {
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();
    const mutation = useMutation({
        mutationFn: apiClient.signOut,
        onSuccess:   async () => {
            await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
            showToast({
                message: "Signed Out !", type: "success"
            });
        },
        onError: (error: Error) => {
            showToast({
                message: error.message, type: "error"
            });
        },
    });
    const handleClick = ()=>{
        mutation.mutate();
    }
    return (
        <button onClick={handleClick}
            className="bg-white/10 backdrop-blur-sm text-white px-6 py-2 rounded-lg font-semibold hover:bg-white/20 border border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
            Logout
        </button>
    );
}
export default SignOutButton;