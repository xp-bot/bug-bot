package bugbot;

import bugbot.config.Config;
import bugbot.listeners.AssignTicket;
import bugbot.listeners.BugHandler;
import bugbot.listeners.CommandHandler;
import net.dv8tion.jda.api.JDABuilder;
import net.dv8tion.jda.api.entities.Activity;
import net.dv8tion.jda.api.utils.Compression;
import net.dv8tion.jda.api.utils.cache.CacheFlag;

import javax.security.auth.login.LoginException;

public class Main {

    public static void main(String[] args) throws LoginException {

        JDABuilder builder = JDABuilder.createDefault(Config.TOKEN);
        builder.disableCache(CacheFlag.MEMBER_OVERRIDES);
        builder.setBulkDeleteSplittingEnabled(false);
        builder.setCompression(Compression.NONE);
        builder.setActivity(Activity.watching("#get-help"));

        builder.addEventListeners(new BugHandler(), new CommandHandler(), new AssignTicket());
        builder.build();

    }

}
