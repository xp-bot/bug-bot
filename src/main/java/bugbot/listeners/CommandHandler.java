package bugbot.listeners;

import net.dv8tion.jda.api.entities.GuildChannel;
import net.dv8tion.jda.api.events.message.MessageReceivedEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;
import org.jetbrains.annotations.NotNull;

import java.util.List;

public class CommandHandler extends ListenerAdapter {

    @Override
    public void onMessageReceived(@NotNull MessageReceivedEvent event) {
        if(event.getMessage().getContentRaw().startsWith("/delete") && event.getAuthor().getId().contains("265849018662387712") || event.getAuthor().getId().contains("524860237979582464")) {
            List<GuildChannel> channels = event.getGuild().getManager().getGuild().getCategoryById("725880023050878978").getChannels();
            for (int i = 0; i < channels.size(); i++) {
                channels.get(i).delete().queue();
            }
        }
    }
}
