package bugbot.listeners;

import net.dv8tion.jda.api.entities.GuildChannel;
import net.dv8tion.jda.api.entities.Member;
import net.dv8tion.jda.api.entities.User;
import net.dv8tion.jda.api.events.channel.text.TextChannelCreateEvent;
import net.dv8tion.jda.api.events.message.MessageReceivedEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;
import org.jetbrains.annotations.NotNull;

import java.util.List;
import java.util.Objects;
import java.util.concurrent.TimeUnit;

public class CommandHandler extends ListenerAdapter {

    @Override
    public void onMessageReceived(@NotNull MessageReceivedEvent event) {
        if(event.getMessage().getContentRaw().startsWith("/delete") && (event.getAuthor().getId().contains("265849018662387712") || event.getAuthor().getId().contains("524860237979582464"))) {
            List<GuildChannel> channels = event.getGuild().getManager().getGuild().getCategoryById("725880023050878978").getChannels();
            for (int i = 0; i < channels.size(); i++) {
                channels.get(i).delete().queue();
            }
            event.getTextChannel().sendMessage("<:tickYes:792577321109422111> **Archive has been cleaned**").queue();
        }else if(event.getMessage().getContentRaw().startsWith("/close") && (event.getAuthor().getId().contains("265849018662387712") || event.getAuthor().getId().contains("524860237979582464"))) {
            event.getTextChannel().sendMessage(event.getMessage().getMentionedMembers().get(0).getAsMention() + ", if you need further Support, please specify your Issue here. Otherwise, please close this Issue.").queue();
            event.getMessage().delete().queue();
        }
    }

    @Override
    public void onTextChannelCreate(@NotNull TextChannelCreateEvent event) {
        if(event.getChannel().getName().startsWith("ticket-")) {
            event.getChannel().sendMessage("<:staff:725039207172669461> Hey there,\n" +
                                                "Thank you for creating a Ticket.\n" +
                                                "**Please already describe your Issue here and try to be as detailed as possible**.\n" +
                                                ":coffee: Have a nice day!").queueAfter(1000, TimeUnit.MILLISECONDS);
        }
    }
}
