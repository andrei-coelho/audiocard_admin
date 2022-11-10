export default {
    
    install : function (app) {
        
        const session_name = 'session_admin_audiocard'
        let session = false 

        // controle a sessao por aqui
        // apagar aqio
        //session__setCookie('eyJhbGciOiJzaGEyNTYifQ==.eyJ0eXBlIjoiYWRtaW4iLCJpZCI6MX0=.Kp+b7p4Izr6pfszkSU3MsrUrdsuN6AyHHRfw/IKy+ms=')

        function session__resetCookie(){
            document.cookie = `${session_name}=; Max-Age=-99999999; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        }

        function session__setCookie(cookie = '') {
            session || cookie != '' ? (function(){
                const d = new Date();
                d.setTime(d.getTime() + (400*24*60*60*1000));
                let expires = "expires="+ d.toUTCString();
                document.cookie = session_name + "=" + (session ? session : cookie) + ";" + expires + ";path=/";
            })() : session__resetCookie();
        }

        function session__getCookie() {
            if(session) return session;
            const value = `; ${document.cookie}`
            const parts = value.split(`; ${session_name}=`)
            session = parts.length === 2 ? parts.pop().split(';').shift() : false 
            return session
        }

        app.config.globalProperties.$set_session = value => session__setCookie(value)
        app.config.globalProperties.$close_session = () => session__resetCookie()
        app.config.globalProperties.$get_session = () => session__getCookie()

    }

}

