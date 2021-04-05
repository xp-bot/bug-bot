package bugbot.listeners;

import net.dv8tion.jda.api.events.message.MessageReceivedEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;
import org.jetbrains.annotations.NotNull;

public class AssignTicket extends ListenerAdapter {

    @Override
    public void onMessageReceived(@NotNull MessageReceivedEvent event) {
        if (event.getTextChannel().getName().startsWith("ticket-") &&
                !(event.getTextChannel().getName().endsWith("yuki")
                        || event.getTextChannel().getName().endsWith("conny")
                        || event.getTextChannel().getName().endsWith("nils")
                        || event.getTextChannel().getName().endsWith("viola")
                )) {
            if (event.getAuthor().getId().contains("265849018662387712")) {
                event.getTextChannel().getManager().setName(event.getTextChannel().getName() + "-yuki").queue();
            } else if (event.getAuthor().getId().contains("524860237979582464")) {
                event.getTextChannel().getManager().setName(event.getTextChannel().getName() + "-conny").queue();
            } else if (event.getAuthor().getId().contains("414755070161453076")) {
                event.getTextChannel().getManager().setName(event.getTextChannel().getName() + "-nils").queue();
            } else if (event.getAuthor().getId().contains("309007621309071360")) {
                event.getTextChannel().getManager().setName(event.getTextChannel().getName() + "-viola").queue();
            }
        }
    }
}
